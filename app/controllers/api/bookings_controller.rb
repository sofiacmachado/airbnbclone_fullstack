module Api
    class BookingsController < ApplicationController
      
      include ActiveStorage::SetCurrent

      def create
        token = cookies.signed[:airbnb_session_token]
        session = Session.find_by(token: token)
        return render json: { error: 'user not logged in' }, status: :unauthorized if !session
  
        property = Property.find_by(id: params[:booking][:property_id])
        return render json: { error: 'cannot find property' }, status: :not_found if !property
  
        begin
          @booking = Booking.create({ user_id: session.user.id, property_id: property.id, start_date: params[:booking][:start_date], end_date: params[:booking][:end_date]})
          render 'api/bookings/create', status: :created
        rescue ArgumentError => e
          render json: { error: e.message }, status: :bad_request
        end
      end
  
      def get_property_bookings
        property = Property.find_by(id: params[:id])
        return render json: { error: 'cannot find property' }, status: :not_found if !property
  
        @bookings = property.bookings.where("end_date > ? ", Date.today)
        render 'api/bookings/index'
      end

      def show
        @booking = Booking.find_by(id: params[:id])
        return render json: {error: 'cannot find booking'}, status: :not_found if !@booking

        render 'api/bookings/show', status: :ok
    end

    def index
      token = cookies.signed[:airbnb_session_token]
      session = Session.find_by(token: token)
      return render json: { error: 'user is not logged in'}, status: :unauthorized if !session

      @bookings = Booking.where(user_id: session.user.id).where("end_date > ?", Date.today).order(start_date: :asc)
      return render json: { error: 'not_found'}, status: :not_found if !@bookings

      render 'api/bookings/index', status: :ok
    end

    def byuser
      token = cookies.signed[:airbnb_session_token]
      session = Session.find_by(token: token)
      return render json: { error: 'user is not logged in'}, status: :unauthorized if !session

     
      properties = Property.where(user_id: session.user.id)
      return render json: {error: 'no properties found'}, status: :not_found if !properties

      
      @bookings = Booking.where(property: properties).order(start_date: :asc)
      return render json: {error: 'properties do not have any bookings'}, status: :not_found if !@bookings

      render 'api/bookings/byuser'

    end
  
      private
  
      def booking_params
        params.require(:booking).permit(:property_id, :start_date, :end_date)
      end
    end
  end
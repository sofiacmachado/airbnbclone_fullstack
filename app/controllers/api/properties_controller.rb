module Api
    class PropertiesController < ApplicationController
        def index
          @properties = Property.order(created_at: :desc).page(params[:page]).per(6)
          return render json: { error: 'not_found' }, status: :not_found if !@properties
    
          render 'api/properties/index', status: :ok
        end
    
        def show
          @property = Property.find_by(id: params[:id])
          return render json: { error: 'not_found' }, status: :not_found if !@property
    
          render 'api/properties/show', status: :ok
        end

        def myproperties
          token = cookies.signed[:airbnb_session_token]
          session = Session.find_by(token: token)
          return render json: { error: 'user is not logged in'}, status: :unauthorized if !session

          @properties = Property.where(user_id: session.user.id)
          return render json: {error: 'no properties found'}, status: :not_found if !@properties

          render 'api/properties/myproperties'
        end

        def add 
            token = cookies.signed[:airbnb_session_token]
            session = Session.find_by(token: token)
            return render json: { error: 'user is not logged in'}, status: :unauthorized if !session
            
            begin
                @property = Property.create({user_id: session.user.id, title: params[:property][:title], description: params[:property][:description], city: params[:property][:city], country: params[:property][:country], property_type: params[:property][:property_type], price_per_night: params[:property][:price_per_night], max_guests: params[:property][:max_guests], bedrooms: params[:property][:bedrooms], beds: params[:property][:beds], baths: params[:property][:baths], image: params[:property][:image] })

                render 'api/properties/add', status: :created
            rescue ArgumentError => e
                render json: {error: e.message}, status: :bad_request 
            end
        end

        def update 
            token = cookies.signed[:airbnb_session_token]
            session = Session.find_by(token: token)
            
            return render json: { error: 'user is not logged in'}, status: :unauthorized if !session
            
            begin
                user = session.user
                @property = user.properties.find_by(id: params[:id])
                
                return render 'not_found', status: :not_found if not @property
                return render 'bad_request', status: :bad_request if not @property.update(property_params)
                render 'api/properties/show', status: :ok
            rescue ArgumentError => e
                render json: {error: e.message}, status: :bad_request 
            end
        end

        private

        def property_params
          params.require(:property).permit(:title, :description, :city, :country, :property_type, :price_per_night, :max_guests, :bedrooms, :beds, :baths, :image)
        end
    end
  end
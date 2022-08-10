class StaticPagesController < ApplicationController
  def home
    render 'home'
  end

  def property
    @data = { property_id: params[:id] }.to_json
    render 'property'
  end

  def login
    render 'login'
  end

  def success
    @data = { booking_id: params[:id]}.to_json
    render 'success'
  end

  def host
    render 'host'
  end
  
  def trips
    render 'trips'
  end
  
end

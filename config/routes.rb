Rails.application.routes.draw do
  root to: 'static_pages#home'

  get '/property/:id' => 'static_pages#property'
  get '/login' => 'static_pages#login'
  get '/booking/:id/success' => 'static_pages#success'
  get '/myproperties' => 'static_pages#myproperties'
  get '/myproperties/add' => 'static_pages#add'
  get '/host' => 'static_pages#host'
  get '/trips' => 'static_pages#trips'
  

  namespace :api do
    # Add routes below this line
    resources :users, only: [:create]
    resources :sessions, only: [:create, :destroy]
    resources :properties, only: [:index, :show, :myproperties, :add, :update]
    resources :bookings, only: [:create, :show, :index, :byuser]
    resources :charges, only: [:create]

    get '/properties/:id/bookings' => 'bookings#get_property_bookings'
    get '/authenticated' => 'sessions#authenticated'
    get '/myproperties' => 'properties#myproperties'
    post '/myproperties/add' => 'properties#add'
    put '/properties/:id/update/' => 'properties#update'
    get '/host/bookings' => 'bookings#byuser'
    
    # stripe webhook
    post '/charges/mark_complete' => 'charges#mark_complete'

  end

end

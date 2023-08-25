Rails.application.routes.draw do
  get 'sessions/new'
  root 'documents#index'

  resources :documents
  get '/documents/:id/json/body', to: 'documents#json_document'
  get '/documents/:id/json/title', to: 'documents#json_title'
  get '/documents/:id/json/size', to: 'documents#json_size'
  
  resources :users do
    resource :user_settings, only: [:edit, :update]
  end
  patch '/users/:user_id/user_settings/edit', to: 'user_settings#update'
  get '/users/:user_id/user_settings/json', to: 'user_settings#user_settings_json'
  get '/user_settings/json', to: 'user_settings#user_settings_json'

  get  '/signup',    to: 'users#new'
  get    '/login',   to: 'sessions#new'
  post   '/login',   to: 'sessions#create'
  delete '/logout',  to: 'sessions#destroy'


  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  # Defines the root path route ("/")
  # root "articles#index"
end

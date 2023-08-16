Rails.application.routes.draw do
  get 'sessions/new'
  root 'documents#index'

  resources :documents
  get '/documents/:id/json/body', to: 'documents#json_document'
  get '/documents/:id/json/title', to: 'documents#json_title'
  get '/documents/:id/json/size', to: 'documents#json_size'
  
  resources :users
  get  '/signup',    to: 'users#new'
  get    '/login',   to: 'sessions#new'
  post   '/login',   to: 'sessions#create'
  delete '/logout',  to: 'sessions#destroy'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  # Defines the root path route ("/")
  # root "articles#index"
end

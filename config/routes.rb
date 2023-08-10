Rails.application.routes.draw do
  root 'documents#index'

  resources :documents, only: [:index, :update, :show]
  get '/documents/:id/json/body', to: 'documents#json_document'
  get '/documents/:id/json/title', to: 'documents#json_title'
  
  resources :users
  get  '/signup',  to: 'users#new'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  # Defines the root path route ("/")
  # root "articles#index"
end

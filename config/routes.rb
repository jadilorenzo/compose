Rails.application.routes.draw do
  root 'documents#index'

  resources :documents, only: [:index, :update, :show]
  get '/documents/:id/json', to: 'documents#json', as: :json_document

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  # Defines the root path route ("/")
  # root "articles#index"
end

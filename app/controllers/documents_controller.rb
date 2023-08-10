class DocumentsController < ApplicationController
   before_action :set_document, only: [:show, :json_document, :json_title, :update]

  def index
    if !logged_in? 
      redirect_to login_path
    end
    @documents = Document.all()
  end
  
  def json_document 
    render json: JSON.parse(@document.body)
  end
  
  def json_title
    render json: @document.title.to_json
  end

  def update
    if @document.update(document_params)
      render json: @document, status: :ok
    else
      render json: { error: 'Failed to update document' }, status: :unprocessable_entity
    end
  end
  
  private
  
  def set_document
    @document = Document.find(params[:id])
  end
  
  def document_params
    params.require(:document).permit(:body, :title)
  end
end

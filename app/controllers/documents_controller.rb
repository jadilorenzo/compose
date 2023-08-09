class DocumentsController < ApplicationController
  before_action :set_document, only: [:update]

  def index
    @documents = Document.all()
  end
  
  def show
    @document = Document.find params[:id]
  end
  
  def json 
    @document = Document.find params[:id]
    render json: JSON.parse(@document.body)
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
    params.require(:document).permit(:body)
  end
end

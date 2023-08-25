class DocumentsController < ApplicationController
  before_action :set_document, only: [:show, :json_document, :json_title, :json_size, :update]
  
  def index
    return redirect_to login_path unless logged_in? 
    @documents = current_user.documents
    if (logged_in?)
      if (@documents.length == 0)
        flash[:info] = "Create your first document!" if @documents.length == 0
        redirect_to new_document_path
      end
    end
  end
  
  def json_title
    render json: @document.title.to_json
  end

  def json_size
    render json: @document.size.to_json
  end
  
  def json_document
    render json: JSON.parse(@document.body)
  end

  def new
    @document = Document.new(title: 'Document')
  end

  def create
    @document = current_user.documents.build({ title: document_params[:title], size: 100})
    if @document.save
      flash[:success] = 'Document was successfully created.'
      redirect_to @document
    else
      render :new
    end
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
    params.require(:document).permit(:title, :body, :size)
  end
end

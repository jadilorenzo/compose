class SessionsController < ApplicationController
  def new
    redirect_to root_url, flash: { info: 'Already logged in' } if logged_in?
  end

  def create
    return if logged_in?
    user = User.find_by(email: params[:session][:email].downcase)
    if user && user.authenticate(params[:session][:password])
      reset_session
      log_in user
      redirect_to documents_path
    else
      flash.now[:danger] = 'Invalid email/password combination'
      render 'new'
    end
  end

  def destroy
    return unless logged_in?
    log_out if logged_in?
    redirect_to root_url
  end
end

module SessionsHelper
  def log_in(user)
    session[:user_id] = user.id
  end

  def current_user
    if (user_id = session[:user_id])
      @current_user ||= User.find_by(id: user_id)
    elsif (user_id = cookies.encrypted[:user_id])
      user = User.find_by(id: user_id)
      if user && user.authenticated?(cookies[:remember_token])
        log_in user
        @current_user = user
      end
    end
  end

  def remember(user)
    user.remember
    cookies.permanent.encrypted[:user_id] = user.id
    cookies.permanent[:remember_token] = user.remember_token
  end

  def log_out
    reset_session
    @current_user = nil
  end

  def logged_in?
    !current_user.nil?
  end

  def authenticate_user!
    @user = User.find_by(id: params[:id])
    if (@user != nil) & (current_user != @user)
      flash[:danger] = "Not authorized."
      redirect_back(fallback_location: root_url) 
    end
  end
end
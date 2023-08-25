class UserSettingsController < ApplicationController
  before_action :authenticate_user!, only: [:edit, :update]
  
  def edit
    @user = User.find(params[:user_id])
    @user_settings = @user.setting
  end

  def user_settings_json
    if params[:user_id] 
      @user = User.find(params[:user_id])
    else 
      @user = current_user
    end
    @user_settings = @user.setting
    render json: @user_settings
  end

  def update
    @user = User.find(params[:user_id])
    @user_settings = @user.setting

    if @user_settings.update(user_settings_params)
      flash[:success] = "Settings updated."
      render 'edit'
    else
      render 'edit'
    end
  end

  private

  def user_settings_params
    params.require(:setting).permit(:color, :theme, :sidebar)
  end
end

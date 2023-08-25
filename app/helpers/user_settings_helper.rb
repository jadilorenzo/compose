module UserSettingsHelper
  def color
    if current_user
      current_user.setting.color
    end
  end
  
  def sidebar
    if current_user
      current_user.setting.sidebar
    end
  end

  def theme
    if current_user
      current_user.setting.theme
    end
  end

  def setting_to_json
    { color: color, sidebar: sidebar, theme: theme}.to_json.html_safe
  end
end

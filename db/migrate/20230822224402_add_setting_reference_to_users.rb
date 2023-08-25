class AddSettingReferenceToUsers < ActiveRecord::Migration[7.0]
  def change
    add_reference :users, :setting, foreign_key: true
  end
end
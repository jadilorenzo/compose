class CreateSettings < ActiveRecord::Migration[7.0]
  def change
    create_table :settings do |t|
      t.integer :color
      t.string :theme
      t.boolean :sidebar
      t.boolean :default
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end

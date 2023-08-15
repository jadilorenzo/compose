class AddSizeToDocument < ActiveRecord::Migration[7.0]
  def change
    add_column :documents, :size, :integer
  end
end

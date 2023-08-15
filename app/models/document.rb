class Document < ApplicationRecord
  belongs_to :user
  validates :title, presence: true
  validates :size, numericality: { greater_than_or_equal_to: 1, less_than_or_equal_to: 300 }

  before_save do 
    self.body ||= '{}'
    self.size ||= 100 
  end
  serialize :body, JSON
end

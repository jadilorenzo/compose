class Document < ApplicationRecord
  belongs_to :user
  validates :title, presence: true
  before_save { self.body ||= '{}' }
  serialize :body, JSON
end

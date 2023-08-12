class Document < ApplicationRecord
  belongs_to :user
  serialize :body, JSON
end

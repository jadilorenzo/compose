class Document < ApplicationRecord
  serialize :body, JSON
end

class Setting < ApplicationRecord
  validates :color, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 0, less_than_or_equal_to: 360 }
  validates :theme, presence: true, inclusion: { in: %w(light dark system) }
  belongs_to :user, optional: true
end

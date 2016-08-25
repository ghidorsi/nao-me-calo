class Establishment < ActiveRecord::Base
  include PgSearch
  validates :name, presence: true
  validates :address, presence: true
  validates :id_places, presence: true
  validates :city, presence: true
  has_many :ratings
  accepts_nested_attributes_for :ratings

  pg_search_scope :search_by_id, :against => :id_places
  pg_search_scope :search_for_ranking, :against => [:city, :state],
                                       :ignoring => :accents

  def has_more_than_2_ratings?
    return self.ratings.size > 2
  end

  def calculate_average
    all_ratings = self.ratings.to_a
    all_ratings = all_ratings.each.map do |rating|
      rating.average_rating
    end
    all_ratings.delete_if {|rating| rating == nil}
    return (all_ratings.sum/all_ratings.length).round(1)
  end

  def populate_rate_array(ratings)
    rate_array = []
    ratings.each do |rating|
      if rating.average_rating < 1.8
        rate_array.push([rating,"Deve Melhorar"])
      elsif rating.average_rating < 2.6
        rate_array.push([rating,"Pode Melhorar"])
      elsif rating.average_rating < 3.4
        rate_array.push([rating,"Regular"])
      elsif rating.average_rating < 4.2
        rate_array.push([rating,"Bom"])
      else
        rate_array.push([rating,"Ótimo"])
      end
    end
    return rate_array
  end

end

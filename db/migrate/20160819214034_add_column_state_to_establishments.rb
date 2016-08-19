class AddColumnStateToEstablishments < ActiveRecord::Migration
  def change
    add_column :establishments, :state, :string
  end
end

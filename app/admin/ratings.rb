
ActiveAdmin.register Rating do

# See permitted parameters documentation:
# https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
#

permit_params :woman, :lgbtqia, :race, :disability, :elder, :obese, :name, :cpf , :email, :phone, :description

# index do
#   selectable_column
#   id_column
#   column :description
#   column :race
#   actions
# end

end

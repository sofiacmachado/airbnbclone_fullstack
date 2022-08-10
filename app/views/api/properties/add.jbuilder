json.property do
    json.id @property.id
    json.title @property.title
    json.city @property.city
    json.country @property.country
    json.price_per_night @property.price_per_night
    json.property_type @property.property_type
    json.image_url @property.image.blob.service_url
end

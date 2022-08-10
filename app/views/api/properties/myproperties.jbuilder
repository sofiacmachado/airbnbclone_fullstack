json.properties do
    json.array! @properties do |property|
        json.id property.id
        json.title property.title
        json.city property.city
        json.country property.country
        json.property_type property.property_type
        json.price_per_night property.price_per_night
        if property.image.attached?
            json.image_url property.image.blob.service_url
          else
            json.image_url property.image_url
        end
    end
end
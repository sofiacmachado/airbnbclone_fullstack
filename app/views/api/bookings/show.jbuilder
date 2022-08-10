json.booking do
    json.id @booking.id
    json.start_date @booking.start_date
    json.end_date @booking.end_date
    json.paid @booking.paid

    json.property do 
        json.id @booking.property.id
        json.title @booking.property.title
        json.city @booking.property.city
        json.country @booking.property.country
        json.property_type @booking.property.property_type
        json.price_per_night @booking.property.price_per_night
        json.user_id @booking.property.user_id
        json.description @booking.property.description
        json.bedrooms @booking.property.bedrooms
        json.beds @booking.property.beds
        json.baths @booking.property.baths
        if @booking.property.image.attached?
            json.image_url @booking.property.image.blob.service_url
          else
            json.image_url @booking.property.image_url
        end
    end

    json.charges @booking.charges
end
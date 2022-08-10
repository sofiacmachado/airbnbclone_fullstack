json.bookings do 
    json.array! @bookings do |booking|
        json.id booking.id
        json.property_id booking.property_id
        json.start_date booking.start_date
        json.end_date booking.end_date
        json.user_id booking.user_id
        json.created_at booking.created_at
        json.updated_at booking.updated_at
        json.title booking.property.title
        json.city booking.property.city
        json.country booking.property.country
        json.property_type booking.property.property_type
        json.price_per_night booking.property.price_per_night
        if booking.property.image.attached?
            json.image_url booking.property.image.blob.service_url
          else
            json.image_url booking.property.image_url
        end
        json.paid booking.paid
        json.charges booking.charges
    end

end
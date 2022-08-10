json.bookings do
    json.array! @bookings do |booking|
      json.id booking.id
      json.start_date booking.start_date
      json.end_date booking.end_date
      json.paid booking.paid
      json.title booking.property.title
        if booking.property.image.attached?
            json.image_url booking.property.image.blob.service_url
          else
            json.image_url booking.property.image_url
        end
        json.charges booking.charges
    end
  end
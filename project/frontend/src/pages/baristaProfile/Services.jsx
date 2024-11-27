const Services = ({ services = [] }) => {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-semibold mb-3">Services & Pricing</h2>
      <div className="grid grid-cols-1 gap-4">
        {services.length > 0 ? (
          services.map((service, index) => (
            <div key={index} className="bg-gray-100 p-3 rounded flex justify-between items-center">
              <p className="font-semibold">{service.name}</p>
              <p>${service.price}</p>
            </div>
          ))
        ) : (
          <p>No services available</p>
        )}
      </div>
    </div>
  );
};

export default Services;

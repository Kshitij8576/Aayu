import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UpcomingAppointments = () => {
  const appointments = [
    {
      id: 1,
      doctor: "Dr. Sarah Johnson",
      specialty: "Cardiology",
      date: "Jan 15, 2025",
      time: "10:30 AM",
      type: "In-person",
      location: "Medical Center, Room 205",
      avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face",
      status: "confirmed"
    },
    {
      id: 2,
      doctor: "Dr. Michael Chen",
      specialty: "Dermatology",
      date: "Jan 18, 2025",
      time: "2:15 PM",
      type: "Video Call",
      location: "Virtual Consultation",
      avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=face",
      status: "pending"
    },
    {
      id: 3,
      doctor: "Dr. Emily Rodriguez",
      specialty: "General Medicine",
      date: "Jan 22, 2025",
      time: "9:00 AM",
      type: "In-person",
      location: "Health Clinic, Floor 3",
      avatar: "https://images.unsplash.com/photo-1594824388853-d0d4e5d8e6a0?w=100&h=100&fit=crop&crop=face",
      status: "confirmed"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-success/10 text-success';
      case 'pending': return 'bg-warning/10 text-warning';
      case 'cancelled': return 'bg-error/10 text-error';
      default: return 'bg-muted text-text-secondary';
    }
  };

  const getTypeIcon = (type) => {
    return type === 'Video Call' ? 'Video' : 'MapPin';
  };

  return (
    <div className="medical-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-text-primary">Upcoming Appointments</h2>
        <Button variant="outline" size="sm" iconName="Plus" iconPosition="left">
          Book New
        </Button>
      </div>
      <div className="space-y-4">
        {appointments?.map((appointment) => (
          <div key={appointment?.id} className="p-4 rounded-lg border border-border bg-card hover:shadow-medical transition-all duration-200">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-muted">
                  <img 
                    src={appointment?.avatar} 
                    alt={appointment?.doctor}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium text-text-primary">{appointment?.doctor}</h3>
                  <p className="text-sm text-text-secondary">{appointment?.specialty}</p>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment?.status)}`}>
                {appointment?.status}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="flex items-center space-x-2">
                <Icon name="Calendar" size={16} className="text-primary" />
                <span className="text-sm text-text-primary">{appointment?.date}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={16} className="text-primary" />
                <span className="text-sm text-text-primary">{appointment?.time}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name={getTypeIcon(appointment?.type)} size={16} className="text-primary" />
                <span className="text-sm text-text-primary">{appointment?.type}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="MapPin" size={16} className="text-primary" />
                <span className="text-sm text-text-primary truncate">{appointment?.location}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-border">
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" iconName="MessageCircle">
                  Message
                </Button>
                <Button variant="ghost" size="sm" iconName="Phone">
                  Call
                </Button>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  Reschedule
                </Button>
                {appointment?.type === 'Video Call' && (
                  <Button variant="default" size="sm" iconName="Video">
                    Join Call
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <button className="w-full text-sm text-primary hover:text-primary/80 font-medium py-2 rounded-lg hover:bg-primary/5 transition-colors">
          View All Appointments
        </button>
      </div>
    </div>
  );
};

export default UpcomingAppointments;
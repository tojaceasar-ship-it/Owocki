import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EventCalendar = ({ events, onEventSelect }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('month'); // month, week, list

  const currentDate = new Date();
  const currentMonth = selectedDate?.getMonth();
  const currentYear = selectedDate?.getFullYear();

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0)?.getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1)?.getDay();
  };

  const formatDate = (date) => {
    return date?.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getEventsForDate = (date) => {
    return events?.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate?.toDateString() === date?.toDateString();
    });
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(selectedDate);
    newDate?.setMonth(currentMonth + direction);
    setSelectedDate(newDate);
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(selectedDate);
    const firstDay = getFirstDayOfMonth(selectedDate);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days?.push(<div key={`empty-${i}`} className="h-20"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const dayEvents = getEventsForDate(date);
      const isToday = date?.toDateString() === currentDate?.toDateString();
      const isSelected = date?.toDateString() === selectedDate?.toDateString();

      days?.push(
        <div
          key={day}
          onClick={() => setSelectedDate(date)}
          className={`h-20 p-2 border border-border/50 cursor-pointer transition-all duration-300 hover:bg-surface/50 ${
            isToday ? 'bg-primary/10 border-primary/30' : ''
          } ${isSelected ? 'bg-secondary/10 border-secondary/30' : ''}`}
        >
          <div className={`text-sm font-cta font-medium mb-1 ${
            isToday ? 'text-primary' : isSelected ? 'text-secondary' : 'text-foreground'
          }`}>
            {day}
          </div>
          <div className="space-y-1">
            {dayEvents?.slice(0, 2)?.map((event, index) => (
              <div
                key={index}
                onClick={(e) => {
                  e?.stopPropagation();
                  onEventSelect(event);
                }}
                className={`text-xs px-1 py-0.5 rounded truncate cursor-pointer ${
                  event?.type === 'art' ?'bg-secondary/20 text-secondary'
                    : event?.type === 'community' ?'bg-primary/20 text-primary' :'bg-accent/20 text-accent'
                }`}
              >
                {event?.title}
              </div>
            ))}
            {dayEvents?.length > 2 && (
              <div className="text-xs text-text-secondary">
                +{dayEvents?.length - 2} more
              </div>
            )}
          </div>
        </div>
      );
    }

    return days;
  };

  const upcomingEvents = events?.filter(event => new Date(event.date) >= currentDate)?.sort((a, b) => new Date(a.date) - new Date(b.date))?.slice(0, 5);

  return (
    <div className="bg-card/50 backdrop-blur-md border border-border rounded-xl overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-accent to-primary rounded-lg flex items-center justify-center neon-glow-accent">
              <Icon name="Calendar" size={20} className="text-black" />
            </div>
            <div>
              <h2 className="font-headline font-bold text-xl text-foreground">Cultural Events</h2>
              <p className="text-text-secondary text-sm">Street culture happenings</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === 'month' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('month')}
              className={viewMode === 'month' ? 'neon-glow-primary' : ''}
              iconName="Calendar"
              iconSize={14}
            >
              Month
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
              className={viewMode === 'list' ? 'neon-glow-primary' : ''}
              iconName="List"
              iconSize={14}
            >
              List
            </Button>
          </div>
        </div>

        {/* Month Navigation */}
        {viewMode === 'month' && (
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigateMonth(-1)}
              className="text-text-secondary hover:text-foreground"
              iconName="ChevronLeft"
              iconSize={16}
            />
            <h3 className="font-headline font-bold text-lg text-foreground">
              {selectedDate?.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigateMonth(1)}
              className="text-text-secondary hover:text-foreground"
              iconName="ChevronRight"
              iconSize={16}
            />
          </div>
        )}
      </div>
      {/* Calendar Content */}
      <div className="p-4">
        {viewMode === 'month' ? (
          <div>
            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1 mb-4">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']?.map(day => (
                <div key={day} className="h-8 flex items-center justify-center text-sm font-cta font-medium text-text-secondary">
                  {day}
                </div>
              ))}
              {renderCalendarDays()}
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {upcomingEvents?.length === 0 ? (
              <div className="text-center py-8">
                <Icon name="Calendar" size={48} className="mx-auto text-text-secondary/50 mb-4" />
                <h3 className="font-cta font-semibold text-text-secondary mb-2">No upcoming events</h3>
                <p className="text-text-secondary/70 text-sm">Check back soon for new cultural happenings</p>
              </div>
            ) : (
              upcomingEvents?.map((event) => (
                <div
                  key={event?.id}
                  onClick={() => onEventSelect(event)}
                  className="p-4 bg-surface/50 border border-border rounded-lg cursor-pointer transition-all duration-300 hover:bg-surface hover:border-primary/50 spray-paint-hover"
                >
                  <div className="flex items-start space-x-3">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      event?.type === 'art' ?'bg-secondary/20 neon-glow-secondary'
                        : event?.type === 'community' ?'bg-primary/20 neon-glow-primary' :'bg-accent/20 neon-glow-accent'
                    }`}>
                      <Icon 
                        name={event?.type === 'art' ? 'Palette' : event?.type === 'community' ? 'Users' : 'Music'} 
                        size={20} 
                        className={
                          event?.type === 'art' ?'text-secondary'
                            : event?.type === 'community' ?'text-primary' :'text-accent'
                        }
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-cta font-semibold text-foreground truncate">
                          {event?.title}
                        </h3>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          event?.type === 'art' ?'bg-secondary/20 text-secondary'
                            : event?.type === 'community' ?'bg-primary/20 text-primary' :'bg-accent/20 text-accent'
                        }`}>
                          {event?.type?.toUpperCase()}
                        </span>
                      </div>
                      
                      <p className="text-text-secondary text-sm mb-2 line-clamp-2">
                        {event?.description}
                      </p>
                      
                      <div className="flex items-center space-x-4 text-xs text-text-secondary">
                        <div className="flex items-center space-x-1">
                          <Icon name="Calendar" size={12} />
                          <span>{new Date(event.date)?.toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Icon name="Clock" size={12} />
                          <span>{event?.time}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Icon name="MapPin" size={12} />
                          <span>{event?.location}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end space-y-2">
                      <div className="text-xs text-text-secondary">
                        {event?.attendees} attending
                      </div>
                      <Button
                        variant="outline"
                        size="xs"
                        className="border-primary/30 text-primary hover:bg-primary/10"
                        iconName="Calendar"
                        iconSize={12}
                      >
                        RSVP
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventCalendar;
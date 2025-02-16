import React from "react";
import ReactDOM from "react-dom";
import reactToWebComponent from "react-to-webcomponent";
import { DateTime } from 'luxon';

interface Props {
  selectedTime?: string,
  onSelectedTime?: (string) => void
}

export default function MobileTimePicker({selectedTime, onSelectedTime}: Props) {
    const optionHeight = '40px'

    const timeOptions = Array.from({ length: 24 }, (_, i) => i / 2).map(i => {
      const hour = Math.floor(i)
      const minutes = (i - hour) * 60
      return `${hour > 10 ? hour : '0' + hour} : ${minutes > 10 ? minutes : '0' + minutes}`
    });

    const [fixedTime, setFixedTime] = React.useState(selectedTime);

    const containerRef = React.useRef<HTMLDivElement>(null);
    const childrenRefs = Array.from({ length: 24 }, () => React.useRef<HTMLLabelElement>(null));

    React.useEffect(() => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setFixedTime(entry.target.children[0].value);
        });
      },
      {
        root: containerRef.current,
        rootMargin: `-51% 0px -49% 0px`
      });

      childrenRefs.forEach(ref => {
        if (ref.current) observer.observe(ref.current);
      });

      return () => {
        childrenRefs.forEach(ref => {
          if (ref.current) observer.unobserve(ref.current);
        });
      };
    }, [containerRef, childrenRefs]);

    React.useEffect(() => {
        if (onSelectedTime && selectedTime !== fixedTime) onSelectedTime(fixedTime);
    }, [fixedTime]);

    const styles = `.mobile-time-picker {
      --option-height: ${optionHeight};

      height: calc(3 * var(--option-height));
      width: 100%;
      max-width: 400px;
      overflow-y: scroll;
      text-align: center;

      scroll-snap-type: mandatory;
      scroll-behavior: smooth;

      background-color: #fff;

      -ms-overflow-style: none;
      scrollbar-width: none;
    }

    .mobile-time-picker::-webkit-scrollbar {
      display: none;
    }

    .time-options-filler  {
      height: var(--option-height);
    }

    .time-option {
      display: block;
      width: 100%;
      height: var(--option-height);
      place-content: center;
      color: hsl(0 0 0 / .4);

      border-radius: 5px;

      scroll-snap-align: center;
      scroll-snap-stop: always;
    }
    
    .time-option:has(input[checked]) {
      background-color: hsl(0 0 0 / .1);
      color: #000;
      font-size: 1.2em;
    }
    
    .time-option input {
      visibility: hidden;
    }`;

    return (
        <div ref={containerRef} className='mobile-time-picker'>
            <style>{styles}</style>
            <div className='time-options-filler'></div>
            {timeOptions.map((time, index) => (
              <label
                id={`mobile-time-picker-option-${index}`}
                htmlFor={`fixed-time-${index.toString()}`}
                ref={childrenRefs[index]}
                key={index}
                className="time-option"
              >
                <input
                  key={`time-${fixedTime === time}`}
                  value={time}
                  name="fixed-time"
                  type="radio"
                  id={`fixed-time-${index.toString()}`}
                  checked={fixedTime === time}
                  onChange={() => setFixedTime(time)}
                />
                {time}
              </label>
            ))}
            <div className='time-options-filler'></div>
        </div>
    );
}


customElements.define(
  "mobile-time-picker",
  reactToWebComponent(MobileTimePicker, React, ReactDOM)
);

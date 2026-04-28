import { useEffect, useRef, useState } from "react";

const stats = [
  { id: 1, name: 'Transactions every 24 hours', value: 44000000, display: 'million', prefix: '', suffix: ' million' },
  { id: 2, name: 'Assets under holding', value: 119, display: 'trillion', prefix: '$', suffix: ' trillion' },
  { id: 3, name: 'New users annually', value: 46000, display: '', prefix: '', suffix: '' },
];

function CountUp({ target, prefix, suffix, darkMode }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;

          const duration = 2000;
          const steps = 60;
          const increment = target / steps;
          let current = 0;

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(0);
    if (num >= 1000) return num.toLocaleString();
    return num;
  };

  return (
    <dd
      ref={ref}
      className={`order-first text-3xl font-semibold tracking-tight sm:text-5xl ${darkMode ? "text-white" : "text-black"}`}
    >
      {prefix}{formatNumber(count)}{suffix}
    </dd>
  );
}

export default function Example({ darkMode }) {
  return (
    <div className={`py-24 sm:py-32 transition-colors duration-300 ${darkMode ? "bg-black" : "bg-white"}`}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.id} className="mx-auto flex max-w-xs flex-col gap-y-4">
              <dt className={`text-base/7 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                {stat.name}
              </dt>
              <CountUp
                target={stat.value}
                prefix={stat.prefix}
                suffix={stat.suffix}
                darkMode={darkMode}
              />
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
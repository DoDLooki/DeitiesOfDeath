import React from 'react';
import { motion } from 'framer-motion';

const BOComponent = ({ bo }) => {
  if (!bo) return <p>Loading...</p>;

  return (
    <div style={{ padding: '1rem', color: 'white', backgroundColor: 'black' }}>
      <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '1rem' }}>
        {bo.title}
      </h2>
      <p style={{ fontSize: '1.2rem', fontStyle: 'italic', marginBottom: '2rem' }}>
        {bo.god}
      </p>

      {bo.build.map((phase, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.2, duration: 0.5 }}
          style={{ marginBottom: '3rem' }}
        >
          <h3
            style={{
              fontSize: '1.4rem',
              fontWeight: '600',
              marginBottom: '0.5rem',
              textDecoration: 'underline',
            }}
          >
            {phase.description}
          </h3>

          <table
            style={{
              width: '100%',
              border: '1px solid white',
              borderCollapse: 'collapse',
              tableLayout: 'fixed',
            }}
          >
            <tbody>
              {phase.steps.map((step, stepIdx) => (
                <tr key={stepIdx} style={{ borderTop: '1px solid white' }}>
                  {step.length === 1 ? (
                    <td
                      colSpan={6}
                      style={{
                        padding: '1rem',
                        fontStyle: 'italic',
                        color: '#ccc',
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-word',
                        lineHeight: '1.5',
                      }}
                    >
                      <span style={{ display: 'block' }}>{step[0]}</span>
                    </td>
                  ) : (
                    step.map((col, colIdx) => (
                      <td
                        key={colIdx}
                        style={{
                          padding: '0.75rem',
                          borderLeft: '1px solid white',
                          verticalAlign: 'top',
                          whiteSpace: 'pre-wrap',
                          wordBreak: 'break-word',
                          lineHeight: '1.4',
                        }}
                      >
                        {col}
                      </td>
                    ))
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      ))}
    </div>
  );
};

export default BOComponent;

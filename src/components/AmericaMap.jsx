import React, { useEffect, useRef, useState } from 'react';
import './AmericaMap.css';

const AmericaMap = ({ highlightCode }) => {
    const svgRef = useRef(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch('/america_map.svg')
            .then(res => res.text())
            .then(svgText => {
                if (svgRef.current) {
                    // Inject SVG
                    svgRef.current.innerHTML = svgText;
                    const svgElement = svgRef.current.querySelector('svg');

                    if (svgElement) {
                        // Setup SVG for container
                        svgElement.setAttribute('width', '100%');
                        svgElement.setAttribute('height', '100%');
                        svgElement.setAttribute('preserveAspectRatio', 'xMidYMid meet');

                        // Apply highlighting logic
                        updateHighlight(svgElement, highlightCode);
                    }
                }
                setLoading(false);
            })
            .catch(err => {
                console.error('Error loading map:', err);
                setLoading(false);
            });
    }, []); // Only load once

    useEffect(() => {
        if (!loading && svgRef.current) {
            const svgElement = svgRef.current.querySelector('svg');
            if (svgElement) {
                updateHighlight(svgElement, highlightCode);
            }
        }
    }, [highlightCode, loading]);

    const updateHighlight = (svg, code) => {
        // Remove all previous highlights
        svg.querySelectorAll('.highlighted-country').forEach(el => {
            el.classList.remove('highlighted-country');
        });

        if (code) {
            const codeLower = code.toLowerCase();
            const countryEl = svg.getElementById(codeLower);
            if (countryEl) {
                countryEl.classList.add('highlighted-country');

                // Try to bring it to front if it's a sibling
                const parent = countryEl.parentNode;
                if (parent) {
                    parent.appendChild(countryEl);
                }

                // Optional: zoom or center on the country?
                // For now just highlight.
            }
        }
    };

    return (
        <div className="map-container">
            {loading && <div className="loader">Cargando mapa...</div>}
            <div
                ref={svgRef}
                style={{ width: '100%', height: '100%', display: loading ? 'none' : 'block' }}
            />
        </div>
    );
};

export default AmericaMap;

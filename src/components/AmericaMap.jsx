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
        const originalViewBox = "0 0 2752.77 1537.63";

        // Remove all previous highlights
        svg.querySelectorAll('.highlighted-country').forEach(el => {
            el.classList.remove('highlighted-country');
        });

        if (code) {
            const codeLower = code.toLowerCase();
            const countryEl = svg.getElementById(codeLower);
            if (countryEl) {
                countryEl.classList.add('highlighted-country');

                // Bring to front
                countryEl.parentNode.appendChild(countryEl);

                // ZOOM LOGIC
                try {
                    const bbox = countryEl.getBBox();

                    // Add padding around the country
                    const padding = Math.max(bbox.width, bbox.height) * 0.4;
                    let targetWidth = bbox.width + padding * 2;
                    let targetHeight = bbox.height + padding * 2;

                    // Don't zoom too much (set min size in SVG units)
                    const minSize = 400;
                    if (targetWidth < minSize) targetWidth = minSize;
                    if (targetHeight < minSize) targetHeight = minSize;

                    const targetX = bbox.x - (targetWidth - bbox.width) / 2;
                    const targetY = bbox.y - (targetHeight - bbox.height) / 2;

                    // Set new viewBox for zoom effect
                    svg.setAttribute('viewBox', `${targetX} ${targetY} ${targetWidth} ${targetHeight}`);
                } catch (e) {
                    console.error("Zoom failed:", e);
                    svg.setAttribute('viewBox', originalViewBox);
                }
            } else {
                svg.setAttribute('viewBox', originalViewBox);
            }
        } else {
            svg.setAttribute('viewBox', originalViewBox);
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

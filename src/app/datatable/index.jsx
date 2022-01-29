import React, {useEffect, useCallback, useRef} from "react";
import "./styles.css"

export default function DataTable({items, renderHead, renderRow, loadMoreItems}) {

  const ref = useRef(null);

  const handleScroll = useCallback(() => {
    const cY    = window.scrollY;
    const tbh   = ref.current.offsetHeight;
    const tresh = 1230;
    if (tbh - cY - tresh < 0) loadMoreItems();
},[loadMoreItems])

  useEffect(() => {
    document.addEventListener('scroll', handleScroll);
    return () => document.removeEventListener('scroll', handleScroll);
  }, [handleScroll])

  return (
    <table className="__alx_table">
    <thead>
      <tr>{renderHead()}</tr>
    </thead>
    <tbody ref={ref}>
      {items.map((row) => renderRow(row))}
    </tbody>
  </table>
  )
}
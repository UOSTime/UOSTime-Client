/* eslint-disable react/no-danger */
import React, { useMemo } from 'react';
import marked from 'marked';

export default function HtmlFromMarkdown({ markdown }) {
  return useMemo(() => (
    <div dangerouslySetInnerHTML={{ __html: marked(markdown) }} />
  ), [markdown]);
}

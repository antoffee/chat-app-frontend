import { AnchorHTMLAttributes, DetailedHTMLProps, HTMLAttributes } from 'react';

export enum TextType {
    TITLE_36_48 = 'title-36-48',
    CAPTION_14_24 = 'caption-14-24',
    CAPTION_14_24_B = 'caption-14-24-b',
    CAPTION_16_24 = 'caption-16-24',
    CAPTION_18_24 = 'caption-18-24',
    CAPTION_10_12 = 'caption-10-12',
}

export type DivProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    type: TextType;
    as?: 'div';
};

export type ParagraphProps = DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement> & {
    type: TextType;
    as?: 'p';
};

export type SpanProps = DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> & {
    type: TextType;
    as?: 'span';
};

export type AnchorProps = DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> & {
    type: TextType;
    as?: 'a';
};

export type HeadingProps = DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement> & {
    type: TextType;
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
};

export type TypographyProps = DivProps | ParagraphProps | SpanProps | AnchorProps | HeadingProps;

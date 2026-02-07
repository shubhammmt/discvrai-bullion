// Re-export Dalmia Cement slides as manufacturing new slides
import { dalmiaCementSlides, totalDalmiaCementSlides, DalmiaCementSlide } from './dalmiaCementSlides';

export type ManufacturingNewSlide = DalmiaCementSlide;

export const manufacturingNewSlides = dalmiaCementSlides;
export const totalMfgNewSlides = totalDalmiaCementSlides;

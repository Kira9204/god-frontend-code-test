import carsData from './cars.json';
import { ICar } from '../../src/types';

// Fake a common API call by wrapping it in a promise
export const getCars = async () => {
    return new Promise<ICar[]>((resolve) => {
        resolve(carsData as ICar[]);
    });
};
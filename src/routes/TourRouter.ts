import {Router, Request, Response, NextFunction } from 'express';
import * as moment from 'moment';

import { ToursService } from './../shared/tours-service';

export class TourRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        
        this.init();
    }

    public init(): void {
        this.router.get(
            '/',
            this.getTours
        );
    }

    private getTours(request: Request, response: Response, next: NextFunction) {
        // Récupère la date du jour
        const now = moment();
        
        const _service = new ToursService();
        console.log('Récupération de la date de tournée : ' + typeof _service);

        // Récupère la date de la tournée courante
        const _tourDate = _service.getDate();

        // Exécute la requête mySQL et retourne les tournées du jour
        
        const tours = {
            "now": now.format('YYYY-MM-DD HH:mm'),
            "date": _tourDate.format('YYYY-MM-DD'),
            "tours": [
                {
                    "time": "8",
                    "places": 8,
                    "isPast": false,
                    "current": _service.isCurrent(8)
                },
                {
                    "time": "11",
                    "places": 8,
                    "isPast": false,
                    "current": _service.isCurrent(11)
                },
                {
                    "time": "14",
                    "places": 8,
                    "isPast": false,
                    "current": _service.isCurrent(14)
                },
                {
                    "time": "17",
                    "places": 8,
                    "isPast": false,
                    "current": _service.isCurrent(17)
                }             
            ]
        };

        response.send(tours);
    }
}

const tourRoutes = new TourRouter();

export default tourRoutes.router;
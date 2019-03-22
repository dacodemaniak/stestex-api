/**
 * @name ToursService Service pour la récupération des tournées
 * @author IDea Factory (dev-team@ideafactory.fr) - Sept. 2018
 * @package /shared
 * @version 1.0.0
 */
import * as moment from 'moment';

export class ToursService {
    /**
     * Date et heure actuelle
     * @var moment.Moment now
     */
    private static now: moment.Moment = moment();

    /**
     * Heures limites des 4 tournées de la journée
     */
    private _deadLines: moment.Moment[];

    /**
     * @var moment.Moment Dernière tournée de la journée (-15 minutes)
     */
    private _lastDayTourDate: moment.Moment;

    /**
     * Date initiale à traiter
     * @var moment.Moment _initialDate
     */
    private _initialDate: moment.Moment;

    /**
     * Date effective de la tournée
     * @var moment.Moment
     */
    private _effectiveTourDate: moment.Moment;

    /**
     * @var moment.Moment Heure de la prochaine tournée effective
     */
    private _nextTourTime: moment.Moment;

    constructor(date: Date = null) {
        if (date === null) {
            this._initialDate = ToursService.now;
        } else {
            this._initialDate = moment(date);
        }

        // Clone la date initiale vers la date effective
        this._effectiveTourDate = this._initialDate.clone();
        
        // Dernière tournée de la journée
        this._lastDayTourDate = moment().set(
            {
                'year': parseInt(ToursService.now.format('YYYY')),
                'month': parseInt(ToursService.now.format('MM')),
                'day': parseInt(ToursService.now.format('DD')),
                'hour': 16,
                'minute': 45
            }
        );

        // Définit la date de tournée effective
        this._setEffectiveTourDate();
    }

    /**
     * @return moment.Moment Date et heure de la prochaine tournée effective
     */
    public getDate(): moment.Moment {
        return this._effectiveTourDate;
    }

    /**
     * Retourne s'il s'agit de l'heure courante de la tournée
     * @param hour Heure à tester
     * @return boolean
     */
    public isCurrent(hour: number): boolean {
        const _hour: number = parseInt(this._effectiveTourDate.format('H'));
        
        console.log('Compare : ' + hour + ' à la tournée de : ' + _hour);

        return _hour === hour;
    }

    private _setEffectiveTourDate(): moment.Moment {
        const weekDay = parseInt(this._effectiveTourDate.format('d'));
        
        if (weekDay === 0) {
            this._effectiveTourDate.add(1, 'days');
            this._effectiveTourDate.set('hour', 8);
            this._effectiveTourDate.set('minute', 0);
        } else {
            if (weekDay === 6) {
                this._effectiveTourDate.add(2, 'days');
                this._effectiveTourDate.set('hour', 8);
                this._effectiveTourDate.set('minute', 0);
            }
        }
        
        // Si la date effective est aussi la date du jour on contrôle l'heure
        if (this._effectiveTourDate.isSame(ToursService.now, 'd')) {
            // Si la date et l'heure courante est >= 16h45, on passe au jour suivant
            if (this._lastDayTourDate.isAfter(this._effectiveTourDate)) {
                this._effectiveTourDate.add(1, 'day');
                // Et on repart...
                this._setEffectiveTourDate();
            } else {
                // Détermine l'heure de la prochaine tournée la plus proche
                this._setDeadLines();
            }
        } 
        return this._effectiveTourDate; 
    }

    /**
     * Définit l'heure de la prochaine tournée du jour effectif
     */
    private _setDeadLines(): void {
        const _tourDate: moment.Moment = this._effectiveTourDate.clone();

        const _tours: moment.Moment[] = [];

        _tours.push(_tourDate.set('hour', 7).set('minute', 45));
        _tours.push(_tourDate.set('hour', 10).set('minute', 45));
        _tours.push(_tourDate.set('hour', 13).set('minute', 45));
        _tours.push(_tourDate.set('hour', 16).set('minute', 45));

        let done: boolean = false;

        for (let i: number = 0; i < _tours.length; i++) {
            if (_tourDate.isBefore(_tours[i]) && !done) {
                this._effectiveTourDate = _tours[i];
                done = true;
            }
        }
        this._effectiveTourDate.add(15, 'm');
    }
}
import {Component, OnInit} from '@angular/core';
import {Player} from '../../player/player';
import {PlayerService} from '../../player/player.service';
import {Router} from '@angular/router';
import {CurrentMatchService} from '../current-match/current-match.service';
import {Match} from '../match';

@Component({
    selector: 'app-create-match',
    templateUrl: './create-match.component.html',
    styleUrls: ['./create-match.component.scss']
})
export class CreateMatchComponent implements OnInit {
    public players: Player[] = [];
    public match: Match = {
        teamA: {
            player1: null,
            player2: null,
            score: 0
        },
        teamB: {
            player1: null,
            player2: null,
            score: 0
        }
    };

    constructor(
        private playerService: PlayerService,
        private currentMatchService: CurrentMatchService,
        private router: Router
    ) {
    }

    public ngOnInit() {
        this.playerService.getAll().subscribe((players) => {
            this.players = players;
        }, (e) => {
            alert('Error getting players: ' + e.message);
        });
    }

    public isPlayerSelected = (player: Player): boolean => {
        return (
            player === this.match.teamA.player1 ||
            player === this.match.teamA.player2 ||
            player === this.match.teamB.player1 ||
            player === this.match.teamB.player2
        );
    }

    public readyToStart() {
        return (this.match.teamA.player1 !== null &&
            this.match.teamA.player2 !== null &&
            this.match.teamB.player1 !== null &&
            this.match.teamB.player2 !== null);
    }

    public onSubmit() {
        this.currentMatchService.set(this.match);
        this.router.navigate(['/match/current']);
    }
}

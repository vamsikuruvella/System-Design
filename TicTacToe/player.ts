class Player {
    private name: string;
    public symbol : string;

    constructor(name: string) {
        this.name = name;
        this.symbol = "";
    }

    getName(): string {
        return this.name;
    }
}

export default Player;
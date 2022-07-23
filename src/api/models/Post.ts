export default class Post {
    
    constructor(
        public username: string,
        public text: string
){}

    static getAll(): Post[] {
        return postList;
    }

    save(): void {
        postList.push(this);
    }

}

let postList: Post[] = [];
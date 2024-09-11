# Jonahs Journal
Johnas Journal is an osint challenge where we need to find what country Jonah is travelling to next from his online diary that he just pushed changes to. We know that his usernames have been relatively similar and that his Twitter username was `@jonahexplorer`. 

## Sherlock
We can use Sherlock to find reused usernames accross diferent websites.

![Sherlock](sherlock.png)

## GitHub
Since we know Jonah `pushed` his changes to his online diary, we decide to look at GitHub first.

![GitHub](github.png)

## Adventure Code Repository
We decide to look at the only repository. 

![Adventure Code Repository on GitHub](repository.png)

## Branches
We notice there are two branches. 

![Adventure Code Branches](branches.png)

## Entry 2 
We click on the `entry-2` branch and notice it's 2 commits ahead of main.

![Adventure Code Entry 2 Branch](entry2.png)

## Flag
> uiuctf{italy}

We decide to look at old commits and notice the next country Jonah is going to is Italy. We format the flag: `uiuctf{italy}`.

![Flag](flag.png)
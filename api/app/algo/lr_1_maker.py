import os
from time import time
from subprocess import getoutput


def make_input(grammar, check_word):
    with open('algo/input.txt', 'w') as file:
        term = ''
        non_term = ''
        for symbol in set(grammar.replace("->", "").replace("\n", "").replace("$", "")):
            if symbol == symbol.lower():
                term += symbol + " "
            else:
                non_term += symbol + " "

        file.write('term\n')
        file.write(term[:-1] + '\n')

        file.write('nonterm\n')
        file.write(non_term[:-1] + '\n')

        file.write('start\n')
        file.write(grammar.strip()[0] + '\n')

        file.write('rules\n')
        file.write(grammar.replace(" ", "").replace("$", "") + '\n')

        file.write('check\n')
        file.write(check_word)


def run_lr(automata_name):
    out_image = f'automata_images/{automata_name}_{int(time() * 10000)}.png'

    output = getoutput('./algo/LR_1 algo/input.txt algo/output.tex')
    os.system('latex2html algo/output.tex > /dev/null 2> /dev/null')
    os.system(f'cp algo/output/img1.png media/{out_image}')
    os.system('rm -rf algo/output* algo/input.txt')

    return out_image, int(output)


def build_automata(grammar, automata_name, check_word):
    make_input(grammar, check_word)
    return run_lr(automata_name)

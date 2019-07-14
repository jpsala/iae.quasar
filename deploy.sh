chmod 755 dist -R
rm -f dist.bz2
echo compress
tar -cjvf dist.bz2 dist/
# > /dev/null 2>&1
echo scp
scp dist.bz2 iae.com.ar:/tmp
echo ssh 'rm -rf /prg/iae.quasar/dist/* ; tar -jxvf /tmp/dist.bz2 -C /prg/iae.quasar > /dev/null 2>&1 ; chmod 755 /prg/iae.quasar/dist -R'
ssh iae.com.ar 'rm -rf /prg/iae.quasar/dist/* ; tar -jxvf /tmp/dist.bz2 -C /prg/iae.quasar > /dev/null 2>&1 ; chmod 755 /prg/iae.quasar/dist -R'
#rm -f dist.bz2
echo Listo

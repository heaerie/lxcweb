lxc image alias create trusty 04aac4257341
# enable set password for ubuntu user 
#  PasswordAuthentication yes
# durai@durai-VirtualBox:~/node/lxcweb$ lxc image list
# +-------+--------------+--------+---------------------------------------------+--------+----------+-------------------------------+
# | ALIAS | FINGERPRINT  | PUBLIC |                 DESCRIPTION                 |  ARCH  |   SIZE   |          UPLOAD DATE          |
# +-------+--------------+--------+---------------------------------------------+--------+----------+-------------------------------+
# |       | bf49cef91a41 | no     | ubuntu 16.04 LTS amd64 (release) (20180912) | x86_64 | 157.97MB | Sep 23, 2018 at 11:40pm (UTC) |
# +-------+--------------+--------+---------------------------------------------+--------+----------+-------------------------------+
# lxc image alias create trusty bf49cef91a41

# create link 
#  sudo ln -fs /etc/systemd/system/snap.lxd.daemon.unix.socket /var/lib/lxd

<?php

namespace Koolawa\CoreBundle\Utils;

class Log
{
    public static function write($message, $session)
    {
        $by = '';
        if (is_string($session))
        {
            $by = 'by '.$session;
        }
        else
        {
            $by = 'by '.$session->get('username').'(ID#'.$session->get('userid').')';
        }

        $filename = __DIR__.'/../../../../app/logs/koolawa.log';
        $date = date('Y-m-d H:i:s');
        error_log("[$date] $message | $by\n", 3, $filename);
    }

}

<?php

/* @Framework/Form/form_rows.html.php */
class __TwigTemplate_81b717bc8d638abf47c505d2ccb823a20927508c63d1bd38f3b1307c97cc9c9d extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = array(
        );
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        $__internal_798a6f86d6d24e062006533d441e3cd796f7ca25fec286fb2f56e985c2770677 = $this->env->getExtension("native_profiler");
        $__internal_798a6f86d6d24e062006533d441e3cd796f7ca25fec286fb2f56e985c2770677->enter($__internal_798a6f86d6d24e062006533d441e3cd796f7ca25fec286fb2f56e985c2770677_prof = new Twig_Profiler_Profile($this->getTemplateName(), "template", "@Framework/Form/form_rows.html.php"));

        // line 1
        echo "<?php foreach (\$form as \$child) : ?>
    <?php echo \$view['form']->row(\$child) ?>
<?php endforeach; ?>
";
        
        $__internal_798a6f86d6d24e062006533d441e3cd796f7ca25fec286fb2f56e985c2770677->leave($__internal_798a6f86d6d24e062006533d441e3cd796f7ca25fec286fb2f56e985c2770677_prof);

    }

    public function getTemplateName()
    {
        return "@Framework/Form/form_rows.html.php";
    }

    public function getDebugInfo()
    {
        return array (  22 => 1,);
    }
}
/* <?php foreach ($form as $child) : ?>*/
/*     <?php echo $view['form']->row($child) ?>*/
/* <?php endforeach; ?>*/
/* */
